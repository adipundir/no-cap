"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSimplifiedContracts } from "@/hooks/use-simplified-contracts";
import { toast } from "sonner"

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [stake, setStake] = useState(0);
  const [enableStaking, setEnableStaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createFact, isLoading, isVerified } = useSimplifiedContracts();

  const isValid =
    title.trim().length > 10 &&
    summary.trim().length > 20 &&
    (!enableStaking || stake >= 0);

  const handleSubmit = async () => {
    if (!isValid || isSubmitting || isLoading) return;

    // Check if user is verified
    if (!isVerified) {
      toast.error('Please verify your humanity with World ID first. Connect your World App wallet and complete verification.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare source with access timestamp (if provided)
      const sourceWithTimestamp = source.trim() ? [{
        url: source.trim(),
        title: source.trim(),
        accessedAt: new Date().toISOString()
      }] : [];

      const stakeAmount = enableStaking && stake > 0 ? stake.toString() : undefined;

      const txHash = await createFact(
        title, 
        summary, 
        sourceWithTimestamp,
        tags,
        stakeAmount
      );
      
      console.log('Fact created successfully:', txHash);
      
      // Reset form
      setTitle("");
      setSummary("");
      setSource("");
      setTags([]);
      setStake(0);
      setEnableStaking(false);
    } catch (error) {
      console.error('Failed to create fact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Verification Status */}
        {!isVerified && (
          <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-orange-800 dark:text-orange-200">
                <strong>Verification Required:</strong> You must verify your humanity with World ID to submit facts. Please connect your World App wallet and complete verification first.
              </p>
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create a fact</h1>
          <Badge variant="outline">{enableStaking ? 'Optional ETH Stake' : 'Free Submission'}</Badge>
        </div>

        <Card variant="module" className="p-0">
          <div className="module-content space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Claim title</label>
              <input
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                placeholder="e.g., Ethereum Cancun upgrade reduced gas fees by 50%"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Summary / context</label>
                      <textarea
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                        rows={5}
                        placeholder="Add a short explanation with links and context. The raw media can be stored in Walrus."
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                      />
                    </div>

                    {/* Source */}
                    <div>
                      <label className="mb-1 block text-sm font-medium">Source (optional)</label>
                      <input
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                        placeholder="Enter source URL or reference"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="mb-1 block text-sm font-medium">Tags (optional)</label>
                      <input
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                        placeholder="Enter tags separated by commas (e.g., ethereum, blockchain, technology)"
                        value={tags.join(', ')}
                        onChange={(e) => {
                          const tagString = e.target.value;
                          const tagArray = tagString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                          setTags(tagArray);
                        }}
                      />
                    </div>

            {/* Optional Staking */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableStaking"
                  checked={enableStaking}
                  onChange={(e) => setEnableStaking(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="enableStaking" className="text-sm font-medium">
                  Add ETH stake (optional)
                </label>
              </div>
              
              {enableStaking && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <div className="md:col-span-1">
                            <label className="mb-1 block text-sm font-medium">Stake (ETH)</label>
                            <input
                              type="number"
                              min={0}
                              step={0.001}
                              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                              value={stake}
                              onChange={(e) => setStake(parseFloat(e.target.value || "0"))}
                              placeholder="0.01"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Any amount (including 0)</p>
                          </div>
                          <div className="md:col-span-2 text-sm text-muted-foreground">
                            <p className="mb-2">🎯 <strong>Why stake ETH?</strong></p>
                            <ul className="text-xs space-y-1">
                              <li>• Earn rewards if community votes CAP (fact is true)</li>
                              <li>• Show confidence in your submission</li>
                              <li>• Help prevent spam and low-quality content</li>
                              <li>• Voting period: 10 minutes for testing</li>
                              <li>• No minimum stake required</li>
                            </ul>
                          </div>
                        </div>
              )}
              
              {!enableStaking && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✨ <strong>Free submission!</strong> No stake required. Your fact will still be reviewed by the community.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                ⏱️ <strong>Voting Period:</strong> 10 minutes (for testing). Community will vote CAP or NO CAP on your fact.
              </p>
            </div>
          </div>
          <div className="module-footer flex items-center justify-between">
            <Link href="/feed" className="text-sm text-muted-foreground hover:underline">Cancel</Link>
            <Button 
              disabled={!isValid || isSubmitting || isLoading}
              onClick={handleSubmit}
            >
{isSubmitting || isLoading ? 'Creating...' : enableStaking ? `Create with ${stake} ETH stake` : 'Create fact (free)'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}