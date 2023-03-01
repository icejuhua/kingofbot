package com.kob.backend.service.user.account;

import java.util.Map;

public interface LoginService {
    public Map<String,String> geToken(String username,String password);
}
