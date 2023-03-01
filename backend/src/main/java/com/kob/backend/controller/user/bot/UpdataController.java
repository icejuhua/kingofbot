package com.kob.backend.controller.user.bot;

import com.kob.backend.service.user.bot.UpdataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UpdataController {
    @Autowired
    UpdataService updataService;
    @PostMapping("/user/bot/updata/")
    public Map<String ,String> updata(@RequestParam Map<String ,String> data){
        return updataService.updata(data);
    }
}
