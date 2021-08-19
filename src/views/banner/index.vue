<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="
          addFromVisible = true;
          dialogTitle = '新增轮播图';
        "
      >
        新增
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :size="table.size"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :max-height="table.maxHeight"
      :empty-text="table.emptyText"
    >
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="轮播图片">
        <template slot-scope="{ row }">
          <img
            style="width: 200px; height: 100px"
            :src="row.image_uri"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="
              addFromVisible = true;
              dialogTitle = '编辑轮播图';
            "
          >
            修改
          </el-button>
          <el-button
       
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="row.edit = !row.edit"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-sizes="table.pageSizes"
      :page-size="table.limit"
      :layout="table.layout"
      :total="listQuery.total"
    >
    </el-pagination>
    <!-- 添加banner -->
    <el-dialog
      v-dialogDrag
      :visible.sync="addFromVisible"
      @open="onOpen"
      @close="onClose"
      :title="dialogTitle"
      :close-on-click-modal="false"
    >
      <el-form
        ref="elForm"
        :model="addFromData"
        :rules="addFromRules"
        size="medium"
 
      >
        <el-form-item label="单行文本" prop="field105">
          <el-input
            v-model="addFromData.field105"
            placeholder="请输入单行文本"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="跳转url" prop="field106">
          <el-input
            v-model="addFromData.field106"
            placeholder="请输入跳转url"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="产品ID" prop="field107">
          <el-input
            v-model="addFromData.field107"
            placeholder="请输入产品ID"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="上传" prop="field108">
          <el-upload
            ref="field108"
            :file-list="field108fileList"
            :action="field108Action"
            :before-upload="field108BeforeUpload"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传不超过 2MB 的文件
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "InlineEditTable",
  computed: {
    ...mapState({
      table: (state) => state.config.table,
    }),
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      loading: true,
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        total: null,
      },
      dialogTitle: "",
      addFromVisible: false,
      addFromData: {
        field105: undefined,
        field106: undefined,
        field107: undefined,
        field108: null,
      },
      addFromRules: {
        field105: [
          {
            required: true,
            message: "请输入单行文本",
            trigger: "blur",
          },
        ],
        field106: [],
        field107: [],
      },
      field108Action: "https://jsonplaceholder.typicode.com/posts/",
      field108fileList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onOpen(e) {
      console.log(e);
    },
    onClose() {
      this.$refs["elForm"].resetFields();
    },
    close() {
      this.$emit("update:visible", false);
    },
    handelConfirm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        this.close();
      });
    },
    field108BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.listQuery.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    async getList() {
      this.loading = true;
      const { data } = await fetchList(this.listQuery);
      this.listQuery.total = data.total;
      const items = data.items;
      this.list = items.map((v) => {
        return v;
      });
      this.loading = false;
    },
    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "The title has been restored to the original value",
        type: "warning",
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: "The title has been edited",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
