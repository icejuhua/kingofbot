package com.kob.backend.service.impl.user.account;

import com.kob.backend.pojo.User;
import com.kob.backend.service.account.LoginService;
import com.kob.backend.service.impl.utils.JwtUtil;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Map<String, String> geToken(String username, String password) {
        //进行密码加密
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username,password);

        Authentication authenticate = authenticationManager.authenticate(authenticationToken);// 登录失败会自动处理
        UserDetailsImpl LoginUser = (UserDetailsImpl) authenticate.getPrincipal();
        User user = LoginUser.getUser();
        String jwt = JwtUtil.createJWT(user.getId().toString());
        Map<String,String> map = new HashMap<>();
        map.put("error_msg","success");
        map.put("token",jwt);


        return map;
    }
}
