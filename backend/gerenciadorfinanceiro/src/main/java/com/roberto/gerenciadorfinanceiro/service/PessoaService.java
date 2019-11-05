package com.roberto.gerenciadorfinanceiro.service;

import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public void atuallizarPropriedadeAtiva(Long codigo, boolean ativo){
        PessoaModel pessoaSalva = buscarPeloCodigo(codigo);
        pessoaSalva.setAtivo(ativo);
        pessoaRepository.save(pessoaSalva);
    }

    private PessoaModel buscarPeloCodigo(Long codigo) {
        PessoaModel pessoaSalva = pessoaRepository.findById(codigo).get();
        if (pessoaSalva==null){
            throw new EmptyResultDataAccessException(1);
        }
        return pessoaSalva;
    }
}
