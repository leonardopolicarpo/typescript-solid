import { OrderStatus } from './interfaces/order-status';
import { ShoppingCart } from './shopping-cart';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    // injeção de dependências na minha classe
    // para ela delegar os serviços
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persintency: Persistency,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) console.log('Seu carrinho está vazio');

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.total()} foi recebido`,
    );
    this.persintency.saveOrder();
    this.cart.clear();
  }
}
