package com.roberto.gerenciadorfinanceiro.service;

import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.repository.LancamentoRepository;
import com.roberto.gerenciadorfinanceiro.repository.PessoaRepository;
import com.roberto.gerenciadorfinanceiro.service.exception.PessoaInexistenteOuInativaException;
import com.sun.xml.bind.v2.TODO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.Optional;

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


    public LancamentoModel atualizar(long codigo, LancamentoModel lancamento) {
        Optional<LancamentoModel> lancamentoSalvo = buscarPeloCodigo(codigo);
        //TODO: Tem que Implementar a consulta de pessoa e categoria antes da atualização
        lancamento.setCodigo(lancamentoSalvo.get().getCodigo());
        return lancamentoRepository.save(lancamento);
    }

    public Optional<LancamentoModel> buscarPeloCodigo(long codigo) {
        Optional<LancamentoModel> lancamentoSalvo = lancamentoRepository.findById(codigo);

        if (lancamentoSalvo==null){
            throw new EmptyResultDataAccessException(1);
        }
        return lancamentoSalvo;
    }
}
