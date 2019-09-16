<template>
  <div class="fillcontain">
    <div class="container">
      <!-- 筛选 -->
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="投标时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
        </el-form-item>

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
    <!-- 分页 -->
    <div class="pagination_container">
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
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
      filterTableData: [],
      search_data: {
        startTime: "",
        endTime: ""
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
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
      allTableData: [],
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
        this.allTableData = res.data;
        this.filterTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      });
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleEdit(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(row, index) {
      // 删除
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
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });

      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        if (index < this.paginations.page_size) return (index = index + page);
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;

      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    onScreeoutMoney() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        return;
      }

      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        console.log(date);
        let time = date.getTime();
        console.log(time);
        return time >= stime && time <= etime;
      });
      //分页
      this.setPaginations();
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
.pagination_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1317px;
}
</style>