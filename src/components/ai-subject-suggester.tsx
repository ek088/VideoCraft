'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Wand2, Loader2 } from 'lucide-react';
import { suggestVideoSubject } from '@/ai/flows/suggest-video-subject';
import { useToast } from '@/hooks/use-toast';

interface AISubjectSuggesterProps {
  currentTopic: string;
  onSuggestionSelect: (suggestion: string) => void;
  children: React.ReactNode;
}

export function AISubjectSuggester({ currentTopic, onSuggestionSelect, children }: AISubjectSuggesterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateSuggestions = () => {
    if (!currentTopic) {
        toast({
            variant: "destructive",
            title: "Topic required",
            description: "Please enter a topic to get suggestions.",
        });
        return;
    }
    
    startTransition(async () => {
      try {
        const result = await suggestVideoSubject({ topic: currentTopic });
        if (result.suggestions) {
            setSuggestions(result.suggestions);
            setIsOpen(true);
        }
      } catch (error) {
        console.error('Failed to get AI suggestions:', error);
        toast({
          variant: 'destructive',
          title: 'AI Suggestion Error',
          description: 'Could not fetch suggestions. Please try again.',
        });
      }
    });
  };

  const handleSelect = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        {children}
        <PopoverTrigger asChild>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-primary"
                onClick={handleGenerateSuggestions}
                disabled={isPending}
                aria-label="Get AI Suggestions"
            >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput placeholder="Filter suggestions..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="AI Suggestions">
              {suggestions.map((suggestion, i) => (
                <CommandItem key={i} onSelect={() => handleSelect(suggestion)}>
                  {suggestion}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
