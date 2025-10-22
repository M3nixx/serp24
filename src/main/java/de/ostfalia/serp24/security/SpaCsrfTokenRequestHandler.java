package de.ostfalia.serp24.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;

import java.util.function.Supplier;

/**
 * Custom CSRF Token Request Handler für SPAs (Angular, React, etc.)
 * Kompatibel mit Spring Security 6.3+
 */
public class SpaCsrfTokenRequestHandler implements CsrfTokenRequestHandler {

    // Wir verwenden Komposition, da XorCsrfTokenRequestAttributeHandler final ist
    private final CsrfTokenRequestHandler delegate = new XorCsrfTokenRequestAttributeHandler();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, Supplier<CsrfToken> csrfTokenSupplier) {
        // Token aus dem Supplier holen
        CsrfToken csrfToken = csrfTokenSupplier.get();
        if (csrfToken != null) {
            // Token als Attribute speichern, damit das SPA (z. B. Angular) es lesen kann
            request.setAttribute(CsrfToken.class.getName(), csrfToken);
            request.setAttribute(csrfToken.getParameterName(), csrfToken);
        }

        // Standardverhalten beibehalten
        delegate.handle(request, response, csrfTokenSupplier);
    }

    @Override
    public String resolveCsrfTokenValue(HttpServletRequest request, CsrfToken csrfToken) {
        return delegate.resolveCsrfTokenValue(request, csrfToken);
    }
}