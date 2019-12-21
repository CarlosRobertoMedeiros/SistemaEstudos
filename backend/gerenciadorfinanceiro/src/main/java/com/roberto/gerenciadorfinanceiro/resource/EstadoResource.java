package com.roberto.gerenciadorfinanceiro.resource;

import com.roberto.gerenciadorfinanceiro.model.EstadoModel;
import com.roberto.gerenciadorfinanceiro.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/estados")
public class EstadoResource {

    @Autowired
    private EstadoRepository estadoRepository;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<EstadoModel> listar(){
        return estadoRepository.findAll();
    }
}
