package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.Role;
import org.swp391.valuationdiamond.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    List<User> getUsersByRole(Role role);

    User findByEmail(String email);

    User findByEmailAndPassword(String email, String password);
    User findByUserId(String user);
}
