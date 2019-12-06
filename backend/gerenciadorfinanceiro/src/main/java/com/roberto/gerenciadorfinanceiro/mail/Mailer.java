package com.roberto.gerenciadorfinanceiro.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Arrays;
import java.util.List;

@Component
public class Mailer {

    @Autowired
    private JavaMailSender mailSender;

    @EventListener
    private void teste(ApplicationReadyEvent event){
        this.enviarEmail("carlosmedeiroslima1981@gmail.com",
                            Arrays.asList("carlosmedeiroslima1981@gmail.com"),
                    "Testando",
                "Olá!<br/> Teste Funcionando !!");
        System.out.println("Terminado o envio de email");
    }



    public void enviarEmail(String remetente,
                            List<String> destinatarios,
                            String assunto,
                            String mensagem) {


        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            helper.setFrom(remetente);
            helper.setTo(destinatarios.toArray(new String[destinatarios.size()]));
            helper.setSubject(assunto);
            helper.setText(mensagem, true);

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException("Problemas com o Envio de Email " + e);
        }


    }

}
