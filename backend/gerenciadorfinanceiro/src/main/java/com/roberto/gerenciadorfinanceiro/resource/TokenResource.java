package com.roberto.gerenciadorfinanceiro.resource;

import com.roberto.gerenciadorfinanceiro.GerenciadorfinanceiroApplication;
import com.roberto.gerenciadorfinanceiro.config.property.GerenciadorFinanceiroApiProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/tokens")
public class TokenResource {

    @Autowired
    private GerenciadorFinanceiroApiProperty gerenciadorFinanceiroApiProperty;

    @DeleteMapping("/revoke")
    public void revoke(HttpServletRequest req, HttpServletResponse resp){
        /*Apenas é necessário tirar o refresh Token*/
        /*Por não armazenar dados, fazemos assim*/
        Cookie cookie = new Cookie("refreshToken",null);
        cookie.setHttpOnly(true);
        cookie.setSecure(gerenciadorFinanceiroApiProperty.getSeguranca().isEnableHttps());
        cookie.setPath(req.getContextPath()+"/oauth/token");
        cookie.setMaxAge(0);

        resp.addCookie(cookie);
        resp.setStatus(HttpStatus.NO_CONTENT.value());
    }
}
