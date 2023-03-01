package com.kob.backend.controller.user.bot;

import com.kob.backend.service.impl.user.bot.RemoveServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RemoveController {
    @Autowired
    RemoveServiceImp removeServiceImp;
    @PostMapping("/user/bot/remove/")
    public Map<String ,String> remove(@RequestParam Map<String ,String> data){
        return removeServiceImp.remove(data);
    }
}
