package com.roberto.gerenciadorfinanceiro.resource;

import com.roberto.gerenciadorfinanceiro.model.CategoriaModel;
import com.roberto.gerenciadorfinanceiro.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/categorias")
public class CategoriaResource {

    @Autowired
    CategoriaRepository categoriaRepository;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_CATEGORIA') and #oauth2.hasScope('write')")
    public List<CategoriaModel> listarTodas(){
        return categoriaRepository.findAll();
    }
}
