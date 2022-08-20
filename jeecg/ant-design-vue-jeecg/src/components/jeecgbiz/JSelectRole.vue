<template>
  <j-select-biz-component
    :columns="columns"

    :listUrl="url.list"
    :returnKeys="returnKeys"

    :value="value"
    displayKey="roleName"
    name="角色"
    queryParamText="角色编码"

    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectBizComponent'

  export default {
    name: 'JSelectRole',
    components: { JSelectBizComponent },
    props: ['value'],
    data() {
      return {
        returnKeys: ['id', 'roleCode'],
        url: { list: '/sys/role/list' },
        columns: [
          { title: '角色名称', dataIndex: 'roleName', align: 'center', width: 120 },
          { title: '角色编码', dataIndex: 'roleCode', align: 'center', width: 120 }
        ]
      }
    }
  }
</script>

<style lang="less" scoped></style>
