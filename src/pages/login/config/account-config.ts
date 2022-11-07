// 编写好规则
export const rules = {
  username: [
    {
      required: true,
      message: '用户名是必传内容~',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{4,10}$/,
      message: '用户名必须是4~10个字母或者数字~',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字~',
      trigger: 'blur',
    },
  ],
  sex: [
    {
      required: true,
      message: '看看你是男是女',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '邮箱是必传内容~',
      trigger: 'blur',
    },
    {
      pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
      message: '必须是正确的邮箱格式~',
      trigger: 'blur',
    },
  ],
}
