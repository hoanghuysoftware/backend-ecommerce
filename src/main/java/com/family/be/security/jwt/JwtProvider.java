package com.family.be.security.jwt;

import com.family.be.security.userPrincipal.UserPrincipal;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    private final static Logger log = LoggerFactory.getLogger(JwtProvider.class);
    private final String SECRET_KEY = "my_secret";
    private final Long EXPIRATION = 86400000L;

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token");
        }catch (UnsupportedJwtException u){
            log.error("Unsupported JWT token");
        }catch (MalformedJwtException m){
            log.error("Malformed JWT token");
        }catch (SignatureException s){
            log.error("Signature error");
        }catch (IllegalArgumentException i){
            log.error("JWT claims string is empty.");
        }
        return false;
    }

    public String getUsernameFromToken(String token){
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
