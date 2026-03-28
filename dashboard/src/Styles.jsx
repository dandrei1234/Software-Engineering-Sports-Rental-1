import { styled } from '@mui/material/styles';
import { Card, Box, Stack, Button, CardHeader } from '@mui/material';

export const CardTitle = styled(CardHeader)(({}) => ({
    textAlign: 'center',
    borderBottom: '1px solid #eee'
}));

export const MinorText = styled(CardHeader)(({ small }) => ({
    color:  '#62748e',
    fontSize: small? '12px' : '16px'
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 'fit-content',
    margin: '40px auto',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
}));

export const FormContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(1),
}));

export const ActionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
}));

export const MyButton = styled(Button)(() => ({
    backgroundColor: "red",
    color: "white",
    '&:hover': {
        backgroundColor: "#2777b2"
    }
}));

export default function Styles() {
    return <></>;
}

