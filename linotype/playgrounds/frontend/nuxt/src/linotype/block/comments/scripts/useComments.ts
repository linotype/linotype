import { useRuntimeConfig, useState, useFetch } from 'nuxt/app'

const useComments = () => {

  const config = useRuntimeConfig()
  
  const props = useState('linotype.block.props', (): object => { return {} })
  const comments = useState('linotype.block.comments', (): any => [])
  const error = useState('linotype.block.error', (): object|null => null)

  const input = useState('linotype.block.error', (): string => '')

  const getComments = async () => {

    const response = await useFetch(`${config.public.linotype.backend_url}/items/${props.value.blockData.collection}`)
    comments.value = response.data.value?.data || []
    error.value = response?.error?.value?.message ? { target: 'list', message: response.error.value?.message } : null

  }

  const postComment = async () => {

    if ( input.value ) {
      const response = await useFetch(`${config.public.linotype.backend_url}/items/${props.value.blockData.collection}`, {
        method: 'POST',
        body: JSON.stringify({
          content: input.value
        })
      })
      comments.value.push( { content: input.value } )
      error.value = response?.error?.value?.message ? { target: 'form', message: response.error.value?.message } : null
      input.value = ''
    } else {
      error.value = { target: 'form', message: 'require text' }
    }

  }
  
  const loadComments = (blockProps: {}) => {
    props.value = blockProps  
    getComments()
  }

  return {
    loadComments,
    postComment,
    comments,
    input,
    error,
    props,
  }

}

export default useComments