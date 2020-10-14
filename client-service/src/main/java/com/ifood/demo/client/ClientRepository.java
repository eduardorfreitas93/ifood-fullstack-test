package com.ifood.demo.client;

import java.util.Optional;
import java.util.Collection;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends CrudRepository<Client, UUID> {

	@RestResource(path = "byName")
	Collection<Client> findByNameIgnoreCaseContaining(@Param("name") String name);

	@RestResource(path = "byPhone")
	Collection<Client> findByPhoneIgnoreCaseContaining(@Param("phone") String phone);

	@RestResource(path = "byEmail")
	Collection<Client> findByEmailIgnoreCaseContaining(@Param("email") String email);

	@RestResource(path = "byCustomQuery")
    @Query("select c from Client c where c.id = :clientId and c.name like %:name% and c.phone like %:phone% and c.email like %:email%")
    Optional<Client> findByCustomQueryIgnoreCaseContaining(@Param("clientId") UUID clientId, @Param("name") String name, @Param("phone") String phone, @Param("email") String email);
}
