import { useState } from 'nuxt/app'
/**
 * @useDomain
 *
 * @description
 * store current domain
 *
 * @author YannickArmspach
 * @since v1
 *
 */
const useDomain = function () {

  const scheme = useState('useDomain.scheme', () => 'http');
  const domain = useState('useDomain.domain', () => 'localhost');

  return {
    scheme,
    domain,
    baseUrl: scheme.value + '://' + domain.value,
  };
};

export default useDomain;
