import { ChatEffects } from '@modules/ai/chat.effects';
import { AuthEffects } from '@modules/auth/auth.effects';
import { OrderEffects } from '@modules/order/order.effects';
import { PostEffects } from '@modules/post/post.effects';
import { ProductEffects } from '@modules/product/product.effects';
import { ThemeEffects } from '@modules/theme/theme.effects';
import { UserEffects } from '@modules/user/user.effects';

export const effects = [AuthEffects, ProductEffects, UserEffects, PostEffects, OrderEffects, ThemeEffects, ChatEffects];
