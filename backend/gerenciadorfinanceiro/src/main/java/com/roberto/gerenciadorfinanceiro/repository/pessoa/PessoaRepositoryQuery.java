package com.roberto.gerenciadorfinanceiro.repository.pessoa;

import com.roberto.gerenciadorfinanceiro.filter.PessoaFilter;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PessoaRepositoryQuery {
    public Page<PessoaModel> filtrar(PessoaFilter pessoaFilter, Pageable pageable);
}
