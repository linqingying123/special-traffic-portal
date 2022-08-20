<template>
  <div class="nav">
    <div class="container">
      <ul class="nav-list clearfix text-center">
        <li v-for="(item,index) in nav" :key="index">
          <el-dropdown :trigger="item.childList.length > 0? 'hover':'contextmenu'" show-timeout="120">
            <a :href="item.link" style="text-decoration: none;">{{ item.name }}</a>
            <template v-if="item.childList.length > 0" #dropdown>
              <el-dropdown-menu v-if="item.childList.length > 0">
                <el-dropdown-item v-for="(itemChild,index) in item.childList">
                  <a :href="itemChild.link"
                     style="text-decoration: none;color:inherit;display: block;height:100%;width:100%;">{{
                      itemChild.name
                    }}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "Nav"
}
</script>

<style scoped>

</style>
