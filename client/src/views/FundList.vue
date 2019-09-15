<template>
  <div class="fillcontain">
    <div class="container">
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item>
          <el-button type="primary" size="small" icon="view" @click="onAddMoney()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      max-height="450"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="date" label="创建时间" align="center" width="240">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" align="center" width="130"></el-table-column>
      <el-table-column prop="describe" label="收支描述" align="center" width="130"></el-table-column>
      <el-table-column prop="income" label="收入" align="center" width="130">
        <template slot-scope="scope">
          <span style="color:#00d053">+ {{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" label="支出" align="center" width="130">
        <template slot-scope="scope">
          <span style="color:#f56767">- {{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" align="center" width="130">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="180"></el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            icon="delete"
            size="small"
            @click="handleDelete(scope.row,scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出页面 -->
    <div class="test">
      <Dialog :dialog="this.dialog" :form="this.form" @update="getProfile"></Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundlist",
  data() {
    return {
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        type: "",
        id: ""
      },
      tableData: [],
      search_data: {
        startTime: "",
        endTime: ""
      },
      dialog: {
        show: false,
        title: "",
        options: "edit"
      }
    };
  },
  components: { Dialog },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/profiles").then(res => {
        this.tableData = res.data;
        // this.allTableData = res.data;
        // this.filterTableData = res.data;
      });
    },
    handleEdit(row) {
      (this.dialog = {
        show: true,
        title: "修改资金信息",
        options: "edit"
      }),
        console.log(row)(
          (this.form = {
            type: row.type,
            describe: row.describe,
            income: row.income,
            expend: row.expend,
            cash: row.cash,
            remark: row.remark,
            id: row._id
          })
        );
    },
    handleDelete(row, index) {
      // 删除
      console.log(row);
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    onAddMoney() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        options: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        type: ""
      };
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
}
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>