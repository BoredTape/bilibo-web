<template>
  <div id="header">
    <div class="logo-box">bilibo</div>
    <div class="right-box">
      <div class="title"></div>
      <div class="avatar-box"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#header {
  background-color: #2b2c44;
  color: #fff;
  display: flex;
  justify-content: space-between;

  .logo-box {
    width: 200px;
    text-align: center;
    line-height: 60px;
    font-size: 22px;
    font-weight: bold;
    color: #e73267;
  }
  .right-box {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    .el-avatar {
      margin-right: 10px;
    }
  }
}
</style>
