import { useState } from '#app'
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

  const scheme = useState('useDomain.scheme', () => 'undefined')
  const domain = useState('useDomain.domain', () => 'undefined')

  return {
    scheme,
    domain,
    baseUrl: scheme.value + '://' + domain.value,
  }
}

export default useDomain
