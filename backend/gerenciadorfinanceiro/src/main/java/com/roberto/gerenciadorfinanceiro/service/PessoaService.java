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

    public PessoaModel atualizar(long codigo, PessoaModel pessoa) {
        PessoaModel pessoaSalva = buscarPeloCodigo(codigo);
        //TODO: Tem que Implementar a consulta de pessoa e categoria antes da atualização
        pessoa.setCodigo(pessoaSalva.getCodigo());
        return pessoaRepository.save(pessoa);
    }
}
