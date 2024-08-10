package com.family.be.security.userPrincipal;

import com.family.be.models.Account;
import com.family.be.models.RoleName;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Collection;
import java.util.Collections;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPrincipal implements UserDetails {
    private String username;
    private String password;
    private Collection<GrantedAuthority> roles;

    public static  UserPrincipal build(Account account){
        Collection<GrantedAuthority> roles = Collections.singleton(new SimpleGrantedAuthority(account.getRoleName().name()));
        return UserPrincipal.builder()
               .username(account.getUsername())
               .password(account.getPassword())
               .roles(roles)
               .build();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
