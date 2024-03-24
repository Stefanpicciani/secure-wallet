import {
    Container,
    ToggleLabel,
    ToggleSelector,
} from "./styles";

const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector 
            checkedIcon={false}
            uncheckedIcon={false}
            checked={false}
            onChange={() => console.log('mudou')}
        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
);

export default Toggle;