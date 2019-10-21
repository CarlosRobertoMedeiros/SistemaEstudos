package com.roberto.gerenciadorfinanceiro.service;

import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.repository.LancamentoRepository;
import com.roberto.gerenciadorfinanceiro.repository.PessoaRepository;
import com.roberto.gerenciadorfinanceiro.service.exception.PessoaInexistenteOuInativaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
public class LancamentoService {

    @Autowired
    PessoaRepository pessoaRepository;

    @Autowired
    LancamentoRepository lancamentoRepository;

    public LancamentoModel salvar(@Valid LancamentoModel lancamentoModel) {
        PessoaModel pessoaModel = pessoaRepository.findById(lancamentoModel.getPessoa().getCodigo()).get();

        if(pessoaModel==null /*|| !pessoaModel.isAtivo()*/){
            throw new PessoaInexistenteOuInativaException();
        }

        return lancamentoRepository.save(lancamentoModel);
    }






}
