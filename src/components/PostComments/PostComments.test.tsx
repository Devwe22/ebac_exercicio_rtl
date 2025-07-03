import { fireEvent, render, screen, act } from '@testing-library/react'; 
import Post from '.';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve permitir a inserção de dois comentários', () => {
        render(<PostComment/>);
        
        // Obtém os elementos usando data-testid
        const textarea = screen.getByTestId('comment-textarea');
        const button = screen.getByTestId('comment-button');
        const commentsList = screen.getByTestId('comments-list');
        
        // Primeiro comentário
        fireEvent.change(textarea, { target: { value: 'Primeiro comentário de teste' } });
        fireEvent.click(button);
        
        // Verifica se o primeiro comentário foi adicionado
        expect(screen.getByTestId('comment-0')).toBeInTheDocument();
        expect(screen.getByText('Primeiro comentário de teste')).toBeInTheDocument();
        
        // Segundo comentário
        fireEvent.change(textarea, { target: { value: 'Segundo comentário de teste' } });
        fireEvent.click(button);
        
        // Verifica se o segundo comentário foi adicionado
        expect(screen.getByTestId('comment-1')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário de teste')).toBeInTheDocument();
        
        // Verifica se ambos os comentários estão presentes na lista
        const comments = commentsList.querySelectorAll('li');
        expect(comments).toHaveLength(2);
        
        // Verifica se o textarea foi limpo após cada inserção
        expect(textarea).toHaveValue('');
    });
});