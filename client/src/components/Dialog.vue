<template>
  <!-- <div class="logFund">
    <el-dialog
      :title="this.dialog.title"
      :visible="this.dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      </div>
    </el-dialog>
  </div> -->
  <el-dialog
      :title="dialog.title"
  :visible.sync="dialog.show"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialog.show = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
  },
  updated() {
      console.log(this.dialog.show)
  },
};
</script>

