<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="login-left">
        <img src="../assets/images/Innovation-bro.png" alt="register-bg" />
      </div>
      <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="login-form">
        <div class="welcome-text">{{ proxy.$t('register.register') }}</div>
        <el-form-item prop="username">
          <el-input 
            v-model="registerForm.username" 
            size="large" 
            :placeholder="proxy.$t('register.username')"
          >
            <template #prefix><svg-icon icon-class="user" class="input-icon" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            size="large"
            show-password
            :placeholder="proxy.$t('register.password')"
            @keyup.enter="handleRegister"
          >
            <template #prefix><svg-icon icon-class="password" class="input-icon" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            size="large"
            show-password
            :placeholder="proxy.$t('register.confirmPassword')"
            @keyup.enter="handleRegister"
          >
            <template #prefix><svg-icon icon-class="password" class="input-icon" /></template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="captchaEnabled" prop="code">
          <div class="captcha-box">
            <el-input
              v-model="registerForm.code"
              size="large"
              :placeholder="proxy.$t('register.code')"
              class="captcha-input"
              @keyup.enter="handleRegister"
            >
              <template #prefix><svg-icon icon-class="validCode" class="input-icon" /></template>
            </el-input>
            <div class="login-code" @click="getCode">
              <img :src="codeUrl" class="login-code-img" />
            </div>
          </div>
        </el-form-item>
        <div class="remember-box" style="justify-content: flex-end;">
          <router-link class="link-type" :to="'/login'">
            {{ proxy.$t('register.switchLoginPage') }}
          </router-link>
        </div>
        <el-button :loading="loading" size="large" type="primary" class="login-btn" @click.prevent="handleRegister">
            {{ proxy.$t('register.register') }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #f0f2f5;
  background-size: cover;
  position: relative;
}

.login-box {
  display: flex;
  width: 900px;
  height: 520px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(18, 52, 99, 0.08); 
  overflow: hidden;
  z-index: 1;

  @media (max-width: 900px) {
    width: 90%;
    height: auto;
    .login-left { display: none; }
    .login-form { width: 100%; padding: 40px; }
  }
}

.login-left {
  width: 50%;
  background: #fdfdfd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #f2f2f2;

  img {
    width: 75%;
    transition: transform 0.4s ease-in-out;
  }
}

.login-form {
  width: 50%;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .welcome-text {
    font-size: 20px;
    font-weight: bold;
    color: #34495e;
    margin-bottom: 30px;
    letter-spacing: 0.5px;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none;
    background: #f5f7fa;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 1px 11px;
    transition: all 0.3s;
    &.is-focus {
      background: #fff;
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
  }
  
  :deep(.el-input__inner) {
    height: 42px;
  }

  .input-icon {
    width: 16px;
    height: 16px;
    color: #909399;
    margin-left: 5px;
  }
}

.captcha-box {
  display: flex;
  width: 100%;
  gap: 15px;
  
  .captcha-input { flex: 1; }
  
  .login-code {
    width: 120px;
    height: 44px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #eee;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
}

.remember-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  
  .link-type {
    font-size: 14px;
    color: var(--el-color-primary);
    text-decoration: none;
    transition: opacity 0.2s;
    &:hover { opacity: 0.8; }
  }
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  letter-spacing: 1px;
  border-radius: 8px;
  background: #3b82f6; 
  border: none;
  font-weight: 500;
  margin-bottom: 20px;
  &:hover {
    background: #2563eb;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
}

.social-login {
  .divider {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    
    &::before {
      content: "";
      position: absolute;
      left: 0; top: 50%;
      width: 100%; height: 1px;
      background: #eee;
    }
    
    span {
      position: relative;
      background: #fff;
      padding: 0 12px;
      color: #bbb;
      font-size: 12px;
    }
  }
  
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    
    .el-button {
      border: 1px solid #eee;
      color: #666;
      transition: all 0.3s;
    }
  }
}
</style>
<script setup lang="ts">
import { getCodeImg, register } from '@/api/login';
import { RegisterForm } from '@/api/types';
import { HttpStatus } from '@/enums/RespEnum';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();

const { t } = useI18n();

const registerForm = ref<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: '',
  code: '',
  uuid: '',
  userType: 'sys_user'
});

const equalToPassword = (rule: any, value: string, callback: any) => {
  if (registerForm.value.password !== value) {
    callback(new Error(t('register.rule.confirmPassword.equalToPassword')));
  } else {
    callback();
  }
};

const registerRules: ElFormRules = {
  username: [
    { required: true, trigger: 'blur', message: t('register.rule.username.required') },
    { min: 2, max: 20, message: t('register.rule.username.length', { min: 2, max: 20 }), trigger: 'blur' }
  ],
  password: [
    { required: true, trigger: 'blur', message: t('register.rule.password.required') },
    { min: 5, max: 20, message: t('register.rule.password.length', { min: 5, max: 20 }), trigger: 'blur' },
    { pattern: /^[^<>"'|\\]+$/, message: t('register.rule.password.pattern', { strings: '< > " \' \\ |' }), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: t('register.rule.confirmPassword.required') },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ],
  code: [{ required: true, trigger: 'change', message: t('register.rule.code.required') }]
};
const codeUrl = ref('');
const loading = ref(false);
const captchaEnabled = ref(true);
const registerRef = ref<ElFormInstance>();

const handleRegister = () => {
  registerRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      try{
        await register(registerForm.value);
        const username = registerForm.value.username;
        await ElMessageBox.alert('<span style="color: red; ">' + t('register.registerSuccess', { username }) + '</font>', '系统提示', {
          app: undefined,
          dangerouslyUseHTMLString: true,
          type: 'success'
        });
        await router.push('/login');
      }
      catch(err){
        loading.value = false;
        if (captchaEnabled.value) {
          getCode();
        }
      }
    }
  });
};
const getCode = async () => {
  const res = await getCodeImg();
  const { code,data } = res;
  if(code===HttpStatus.OK&&!data)captchaEnabled.value = false;
  else {
    registerForm.value.code = '';
    codeUrl.value = 'data:image/gif;base64,' + data.img;
    registerForm.value.uuid = data.uuid;
  }
};
onMounted(() => {
  getCode();
});
</script>