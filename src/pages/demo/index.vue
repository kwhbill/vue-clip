<template>
  <div>
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
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <el-input style="width:100%;" v-if="scope.row == temMail" v-model="temMail.name"></el-input>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="邮箱">
          <template slot-scope="scope">
            <el-input style="width:100%;" v-if="scope.row == temMail" v-model="temMail.address"></el-input>
            <span v-else>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="信息">
          <template slot-scope="scope">
            <el-input style="width:100%;" v-if="scope.row == temMail" v-model="temMail.message"></el-input>
            <span v-else>{{scope.row.message}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row == temMail">
              <el-button @click="onEditBtnConfirm(scope.row)" type="text" size="small">确定</el-button>
              <el-button @click="onDeleteBtnCancel(scope.row)" type="text" size="small">取消</el-button>
            </div>
            <div v-else>
              <el-button @click="onEditBtnClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="onDeleteBtnClick(scope.row)" type="text" size="small">删除</el-button>
            </div>
          </template>
        </el-table-column>
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
      mailList: [],
      temMail: {}
    };
  },

  computed: {},
  mounted() {},
  watch: {},
  methods: {
    onDeleteBtnCancel() {
      this.temMail = {};
    },
    onEditBtnClick(row) {
      this.temMail = row;
    },
    async onEditBtnConfirm() {
      let params = _.cloneDeep(this.temMail);
      let res = await ly.net.fetchApi({
        url: "/mail/update",
        method: "POST",
        data: qs.stringify(params)
      });
      if (res.data.result == 0) {
        this.getMailList();
        this.temMail = {};
         this.$message({
          message: "编辑成功",
          type: "success"
        });
      }else{
          this.$message({
          message: "编辑失败",
          type: "error"
        });
      }
    },
    async onDeleteBtnClick(row) {
      let res = await ly.net.fetchApi({
        url: "/mail/delete",
        method: "POST",
        data: qs.stringify({
          _id: row._id
        })
      });
      if (res.data.result == 0) {
        this.getMailList();
        this.temMail = {};
        this.$message({
          message: "删除成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "error"
        });
      }
    },
    async submitForm() {
      let params = _.cloneDeep(this.mailForm);
      let res = await ly.net.fetchApi({
        url: "/mail/add",
        method: "POST",
        data: qs.stringify(params)
      });
      if (res.data.result == 0) {
        this.getMailList();
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
      this.mailList = res.data.items;
    }
  }
};
</script>

<style scoped>
</style>
