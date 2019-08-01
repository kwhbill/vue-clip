<template>
  <div >
    <div style="fontSize:30px;fontWeight:500">表单</div>
    <div style="width:50%">
<el-form
      :model="mailForm"
      status-icon
      :rules="rules"
      ref="mailForm"
      label-width="100px"
      class="demo-mailForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input type="name" v-model="mailForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="address">
        <el-input type="address" v-model="mailForm.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="message">
        <el-input type="message" v-model="mailForm.message" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('mailForm')">提交</el-button>
      </el-form-item>
    </el-form>
    </div>
    
    <div style="fontSize:30px;fontWeight:500">列表</div>
    <div class="list" style="width:70%">
      <el-table :data="mailList" style="width: 100%" border>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="邮箱"></el-table-column>
        <el-table-column prop="message" label="信息"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "",
  props: {},
  created() {
    this.getMailList();
  },
  data() {
    return {
      mailForm: {
        address: "",
        message: "",
        name: ""
      },
      mailList:[]

    };
  },

  computed: {},
  mounted() {},
  watch: {},
  methods: {
    async submitForm() {
      let params = _.cloneDeep(this.mailForm);
      let res = await ly.net.fetchApi({
        url: "/mail/add",
        method: "POST",
        data: qs.stringify(params)
      });
      if (res.data.result == 0) {
        this.getMailList()
        this.resetForm();
      }
    },
    resetForm() {
      this.mailForm.address = "";
      this.mailForm.message = "";
      this.mailForm.name = "";
    },
    async getMailList() {
      let res = await ly.net.fetchApi({
        url: "/mail/list"
      });
      this.mailList = res.data.items
    }
  }
};
</script>

<style scoped>
</style>
