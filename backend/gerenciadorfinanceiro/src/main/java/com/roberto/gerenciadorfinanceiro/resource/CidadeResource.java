package com.roberto.gerenciadorfinanceiro.resource;

import com.roberto.gerenciadorfinanceiro.model.CidadeModel;
import com.roberto.gerenciadorfinanceiro.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/cidades")
public class CidadeResource {

    @Autowired
    private CidadeRepository cidadeRepository;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<CidadeModel> pesquisar(@RequestParam Long estado) {
        return cidadeRepository.findByEstadoCodigo(estado);
    }

}
