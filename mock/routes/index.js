var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/menu/tree', function (req, res, next) {
  return res.send({
    code: 0,
    data: {"loanProcess": [], "allocate": [], "remoteInterviewSeat": [], "myCustomer": [], "archiveDownload": ["approvalMaterialsDown"], "faceSignRecord": [], "basicConfig": ["cooperativeDeptManage", "productConfig"]}
  });
});

router.post('/loanOrder/workbench', function (req, res, next) {
  return res.send({
    "code": 0, "data": [
      {
        "acceptId": 21,
        "acceptName": "靓仔",
        "aisleChoiceType": 1,
        "aisleUseType": 1,
        "aisleUseTypeName": "常规通道",
        "bankCode": "9810168916",
        "busiAreaCode": 440101,
        "busiCityCode": 440100,
        "busiProvinceCode": 440000,
        "createDate": 1564574817000,
        "createDateStr": "2019-07-31 20:06",
        "createUser": 21,
        "demandBankId": 21,
        "demandBankName": "****股份有限公司广州分行",
        "deptId": 21,
        "deptName": "****股份有限公司广州分行",
        "idCard": "123",
        "loanTasks": [{
          "assignees": [21],
          "category": "creditMaterialsUpload",
          "createDate": 1564574817000,
          "createDateStr": "2019-07-31 20:06",
          "createUser": 1,
          "hasForm": 0,
          "id": 15754,
          "operator": 21,
          "orderNo": "vx465248729120190731200650728",
          "orgId": 2127590,
          "parallelNo": "9a5737b2-0ea1-4966-95b4-8520dc5b20af",
          "parrelMulti": false,
          "processDefId": "GDBOCGuangDongCarloanProcess:1:101793",
          "processInstId": "142513",
          "processTaskId": "142524",
          "sceneName": "新建进件",
          "status": 2,
          "submited": false,
          "taskCode": "usertask1@GDBOCGuangDongCarloanProcess",
          "taskDefKey": "usertask1",
          "taskName": "新建进件",
          "taskNameCode": "xinjianjinjian",
          "updateDate": 1564574817000,
          "updateUser": 1
        }],
        "modifyDisplay": false,
        "orderNo": "vx465248729120190731200650728",
        "orgId": 2127590,
        "parallelNo": "9a5737b2-0ea1-4966-95b4-8520dc5b20af",
        "paymentApplyDisplay": false,
        "paymentConfirmDisplay": false,
        "productCode": "gdbocguangdongcarloanprocess",
        "productId": 1281,
        "productName": "客户经理流程",
        "realName": "陈xx",
        "status": 0,
        "statusUpdateTimeStr": "",
        "terminateDisplay": false,
        "updateDate": 1564574820000,
        "updateUser": 21
      }],
    "msg": "success", "page": {"pageNum": 1, "pageSize": 15, "pages": 50, "startRow": 0, "total": 738, "totalPage": 50}
  });
});

module.exports = router;
