package br.com.roberto.gerenciadorfinanceiro.repository.search;

import br.com.roberto.gerenciadorfinanceiro.domain.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the User entity.
 */
public interface UserSearchRepository extends ElasticsearchRepository<User, String> {
}
