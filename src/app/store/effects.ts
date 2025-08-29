import { AuthEffects } from '@modules/auth/auth.effects';
import { ProductEffects } from '@modules/product/product.effects';
import { ThemeEffects } from '@modules/theme/theme.effects';
import { UserEffects } from '@modules/user/user.effects';

export const effects = [AuthEffects, ProductEffects, UserEffects, ThemeEffects];
