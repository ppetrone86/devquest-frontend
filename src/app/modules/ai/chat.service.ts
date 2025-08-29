import { inject, Injectable } from '@angular/core';
import { Chat, ChatMessage, ChatStatus } from '@modules/ai/chat.model';
import { ApiService } from '@services/api/api.service';
import { DevQuestProvider } from '@services/api/providers/dev-quest/dev-quest-provider.service';
import { environment } from '@src/environments/environment';
import { map, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends ApiService {
  protected provider = inject(DevQuestProvider);

  private _dryRun = environment.dryRun;
  private _mockChats = '../../../assets/data/mock/ai.chats.json';
  private _mockAnswers = '../../../assets/data/mock/ai.answers.json';

  list(): Observable<Chat[]> {
    if (this._dryRun) {
      return this.get<{ chats: Chat[] }>(this._mockChats).pipe(
        map((data) => data.chats.map((c) => ({ ...c, creationTime: new Date(c.creationTime) })))
      );
    } else {
      return this.provider.chatbot.list<Chat>();
    }
  }

  create(): Observable<Chat> {
    if (this._dryRun) {
      const newChat = {
        id: uuidv4(),
        creationTime: new Date(),
        messages: [],
        title: 'New Chat',
        status: ChatStatus.NEW,
        typingMessage: null,
      } as Chat;
      return of(newChat);
    } else {
      return this.provider.chatbot.create();
    }
  }

  deleteChat(chatId: string): Observable<boolean> {
    if (this._dryRun) {
      return of(true);
    } else {
      return this.provider.chatbot.delete<boolean>(chatId);
    }
  }

  evaluate(chatId: string, rate: number): Observable<Chat> {
    if (this._dryRun) {
      return of();
    } else {
      return this.provider.chatbot.evaluate<Chat>(chatId, rate);
    }
  }

  fetchMessages(chatId: string): Observable<ChatMessage[]> {
    if (this._dryRun) {
      return this.get<{ chats: Chat[] }>(this._mockChats).pipe(
        map((data) => {
          const chat = data.chats.find((c) => c.id === chatId);
          return chat ? chat.messages : [];
        })
      );
    } else {
      return this.provider.chatbot.fetchMessages<Chat>(chatId).pipe(map((data) => data.messages || []));
    }
  }

  sendMessage(chatId: string, content: string): Observable<ChatMessage> {
    if (this._dryRun) {
      return this.get<{ answers: { content: string }[] }>(this._mockAnswers).pipe(
        map((data) => {
          const randomAnswer = data.answers[Math.floor(Math.random() * data.answers.length)];
          return {
            id: uuidv4(),
            content: randomAnswer.content,
            role: 'model',
            creationDate: new Date(),
          } as ChatMessage;
        })
      );
    } else {
      return this.provider.chatbot.sendMessage<Chat>(chatId, content).pipe(
        map((data) => {
          // Ensure data.messages exists and contains at least one message
          if (data.messages && data.messages.length > 0) {
            return data.messages[data.messages.length - 1];
          }
          throw new Error('No messages returned from the API');
        })
      );
    }
  }
}
