package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("pk/")
public class BotinfoController {
    @RequestMapping("getbotinfo/")
    public List<Map<String,Integer>> getBotInfo(){
        List <Map<String,Integer>> list = new LinkedList<>();
        Map<String,Integer> bot1 = new HashMap<>();
        bot1.put("Lish",123);
        bot1.put("Liming",23);
        bot1.put("XIaohong",11);
        Map<String,Integer> bot2 = new HashMap<>();
        bot2.put("xiaoxiao",123);
        bot2.put("wangli",23);
        bot2.put("傻逼",11);
        list.add(bot1);
        list.add(bot2);
        return list;


    }
}
