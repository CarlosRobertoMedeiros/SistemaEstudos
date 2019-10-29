package com.roberto.gerenciadorfinanceiro.repository.pessoa;

import com.roberto.gerenciadorfinanceiro.filter.PessoaFilter;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class PessoaRepositoryImpl implements PessoaRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Page<PessoaModel> filtrar(PessoaFilter pessoaFilter, Pageable pageable) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<PessoaModel> criterio = builder.createQuery(PessoaModel.class);
        Root<PessoaModel> root = criterio.from(PessoaModel.class);

        Predicate[] predicates = criarRestricoes(pessoaFilter, builder, root);
        criterio.where(predicates);

        TypedQuery<PessoaModel> query = manager.createQuery(criterio);
        adicionarRestricoesDePagina(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(pessoaFilter));
    }

    private Long total(PessoaFilter pessoaFilter) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
        Root<PessoaModel> root = criteria.from(PessoaModel.class);

        Predicate[] predicates = criarRestricoes(pessoaFilter, builder, root);
        criteria.where(predicates);
        criteria.select(builder.count(root));

        return manager.createQuery(criteria).getSingleResult();
    }

    private Predicate[] criarRestricoes(PessoaFilter pessoaFilter, CriteriaBuilder builder, Root<PessoaModel> root) {
        List<Predicate> predicates = new ArrayList<>();

        if (!StringUtils.isEmpty(pessoaFilter.getNome())){
            predicates.add(builder.like(
                    builder.lower(root.get("nome")),
                    "%" + pessoaFilter.getNome().toLowerCase() + "%"));
        }
        return predicates.toArray(new Predicate[predicates.size()]);

    }

    private void adicionarRestricoesDePagina(TypedQuery<PessoaModel> query, Pageable pageable) {
        int paginaAtual = pageable.getPageNumber();
        int totalRegistroPorPagina = pageable.getPageSize();
        int primeiroRegistroDaPagina = paginaAtual * totalRegistroPorPagina;

        query.setFirstResult(primeiroRegistroDaPagina);
        query.setMaxResults(totalRegistroPorPagina);
    }
}
