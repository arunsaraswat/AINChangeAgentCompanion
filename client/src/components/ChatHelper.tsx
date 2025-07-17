import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Trash2, Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useChatHelper } from './ChatHelperContext';

export const ChatHelper: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    messages,
    clearMessages,
    isLoading,
    sendMessage
  } = useChatHelper();
  
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive or dialog opens
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') || scrollAreaRef.current;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    };

    if (isOpen && messages.length > 0) {
      // When dialog opens with existing messages, scroll after a short delay
      setTimeout(scrollToBottom, 100);
    } else if (messages.length > 0) {
      // When new messages arrive, scroll immediately
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput('');
    await sendMessage(userInput);
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const exportChatToFile = () => {
    if (messages.length === 0) return;

    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    let exportContent = `AI-Native Change Agent - LLM Chat Helper\nExported: ${timestamp}\n\n`;
    exportContent += '='.repeat(60) + '\n\n';

    messages.forEach((message, index) => {
      const role = message.role === 'user' ? 'User' : 'Assistant';
      exportContent += `${role}:\n`;
      exportContent += `${message.content}\n\n`;
      
      // Add separator between messages (except after the last one)
      if (index < messages.length - 1) {
        exportContent += '-------\n\n';
      }
    });

    // Create and download the file
    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-conversation-${now.toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[900px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>AI-Native Change Agent - LLM Chat Helper</DialogTitle>
          <DialogDescription>
            Ask questions about change management, AI adoption, or course content
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>Start a conversation by typing your question below.</p>
                <p className="text-sm mt-2">
                  Try asking about change management strategies, stakeholder engagement, or AI implementation!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 relative group ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <div className={`prose prose-sm max-w-none ${
                      message.role === 'user' ? 'prose-invert' : 'dark:prose-invert'
                    }`}>
                      {message.role === 'assistant' ? (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      ) : (
                        <p className="mb-0 text-white">{message.content}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(message.content, message.id)}
                    >
                      {copiedId === message.id ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t px-6 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 min-h-[80px] resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!input.trim() || isLoading} size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={exportChatToFile}
                disabled={messages.length === 0}
                title="Download conversation"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download chat</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={clearMessages}
                disabled={messages.length === 0}
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear chat</span>
              </Button>
            </div>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            Powered by OpenRouter (GPT-4o mini)
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};