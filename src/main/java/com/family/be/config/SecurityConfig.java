package com.family.be.config;

import com.family.be.models.RoleName;
import com.family.be.security.jwt.JwtEntryPoint;
import com.family.be.security.jwt.JwtFilter;
import com.family.be.security.userPrincipal.UserDetailsServiceIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsServiceIMPL userDetailsServiceIMPL;
    private final JwtFilter jwtFilter;
    private final JwtEntryPoint jwtEntryPoint;

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceIMPL).passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
//                .authorizeRequests()
//                .antMatchers(
//                        "/api/v1/address/**",
//
//                        "/api/v1/reviews/**",
//                        "/api/v1/product/search",
//                        "/api/v1/product/by-brand")
//                .hasAuthority(RoleName.CUSTOMER.name())
//                .antMatchers(
//                        "/api/v1/customer/",
//                        "/api/v1/importer/**",
//                        "/api/v1/product-attribute/**",
//                        "/api/v1/receipt/**",
//                        "/api/v1/sale/**")
//                .hasAuthority(RoleName.ADMIN.name())
//                .antMatchers(HttpMethod.POST, "/api/v1/order").hasAuthority(RoleName.CUSTOMER.name())
//                .antMatchers(HttpMethod.GET, "/api/v1/order").hasAuthority(RoleName.ADMIN.name())
//                .antMatchers(HttpMethod.POST, "/api/v1/brand").hasAuthority(RoleName.ADMIN.name())
//                .antMatchers(HttpMethod.PATCH, "/api/v1/order/**").hasAuthority(RoleName.ADMIN.name())
//                .antMatchers("/api/v1/auth/**").permitAll()
//                .anyRequest().authenticated()
//                .anyRequest().permitAll()
//                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
