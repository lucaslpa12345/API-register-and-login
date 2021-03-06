import {sendEmail} from '../../../domain/useCase/sendEmail';
import {transporterAdapter} from '../../../domain/utils/transporterEmailAdapter';
import {generatecontent} from '../../../domain/useCase';


export class SendEmail implements sendEmail {
  constructor(private transporter: transporterAdapter,
              private generateContent: generatecontent,
  ) {}
  async send(email: string): Promise<any> {
    const content = await this.generateContent.generate(email);
    if (content===400) {
      return content;
    }
    await this.transporter.send(content);
    return 200;
  }
}
