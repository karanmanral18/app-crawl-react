import apiClient from '../apiClient';
import { createClientParam } from './clientRepository.param';

export const createClient = async ({ email, name, pin, cin }: createClientParam) => {
    return await apiClient({
        method: 'post',
        url: `/clients`,
        data: {
            email,
            name,
            pin,
            cin
        },
    });
};