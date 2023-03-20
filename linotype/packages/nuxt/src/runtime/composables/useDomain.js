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
  const scheme = 'https';

  const domain = useState('useDomain.domain', () => '');

  return {
    scheme,
    domain,
    baseUrl: scheme + '://' + domain.value,
  };
};

export default useDomain;
