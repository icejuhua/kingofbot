package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterImpl implements RegisterService {


    @Autowired
    UserMapper userMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> Register(String username, String password, String confirmedPassword) {
        Map<String,String> map = new HashMap<>();
        if (username == null){
            map.put("error_msg","用户名不能为空");
            return map;
        }
        if (password == null || confirmedPassword == null){
            map.put("error_msg","密码不能为空");

            return map;
        }

        username.trim();

        if (username.length() == 0){
            map.put("error_msg","用户名不能为空");
            return map;
        }
        if (password.length() == 0 || confirmedPassword.length() == 0){
            map.put("error_msg","密码不能为空");

            return map;
        }

        if (!password.equals(confirmedPassword)){
            map.put("error_msg","两次输入的密码要一致");
            return map;
        }
        if (username.length() > 100){
            map.put("error_msg","用户名长度过长");
            return map;
        }
        if (password.length() > 100 || confirmedPassword.length() > 100){
            map.put("error_msg","密码长度过长");
            return map;
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        queryWrapper.eq("username",username);
        List<User> list = userMapper.selectList(queryWrapper);
        if (!list.isEmpty()){
            map.put("error_msg","用户已存在");
            return map;
        }


        String encoderPasswod = passwordEncoder.encode(password);
        String photo = "https://cdn.acwing.com/media/user/profile/photo/66521_lg_fa24cb4651.jpg";
        User user = new User(null,username,encoderPasswod,photo);
        userMapper.insert(user);


        map.put("error_msg","success");
        return map;

    }
}
