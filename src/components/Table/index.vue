<template>
    <el-table v-bind="$attrs" :stripe="stripe" :border="border" style="width: 100%">
        <template v-for="item in columns">
            <el-table-column
                :type="item.type"
                :width="item.width"
                v-if="item.type === 'selection'"
        ></el-table-column>
             <slot
                v-if="item.slot"
                :name="item.slot"></slot>
            <el-table-column
            v-if="(item.type !== 'selection')&&(!item.slot)"
                :key="item.prop"
                :label="item.label" 
                :prop="item.prop" 
                :type="item.type"
                :width="item.width"
                :fixed="item.fixed "
                :sortable="item.sortable"></el-table-column>
        </template>
    </el-table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        columns: {
            type: Array,
            default: ()=>[]
        },
        stripe: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        }
    },
    methods: {
    }
}
</script>