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

    public void atuallizarPropriedadeAtiva(PessoaModel pessoaModel, boolean ativo){
        PessoaModel pessoaSalva = buscarPeloCodigo(pessoaModel);
        pessoaSalva.setAtivo(ativo);
        pessoaRepository.save(pessoaSalva);
    }

    private PessoaModel buscarPeloCodigo(PessoaModel pessoaModel) {
        PessoaModel pessoaSalva = pessoaRepository.findById(pessoaModel.getCodigo()).get();
        if (pessoaSalva==null){
            throw new EmptyResultDataAccessException(1);
        }
        return pessoaSalva;
    }
}
